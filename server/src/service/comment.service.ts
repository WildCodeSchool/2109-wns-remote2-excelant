import CreateCommentInput from '../schema/Comment/comment.create';
import UpdateCommentInput from '../schema/Comment/comment.update';
import DeleteCommentInput from '../schema/Comment/comment.delete';
import { CommentModel } from '../schema/index';


class CommentService {

  // eslint-disable-next-line
  async findAllCommentsByTask(id: string) {

    const comments = await CommentModel
      .find({ task: {_id: id} })
      .populate({ 
        path: 'author',
        select: '_id, name',
      })
      .lean();
    return comments;
  }

  // eslint-disable-next-line
  async createComment(input: CreateCommentInput) {
    const comment = await CommentModel.create(input);
    await comment.populate({ 
        path: 'author',
        select: '_id, name',
      });
    return comment;
  }

  // eslint-disable-next-line
  async updateComment(id: string, input: UpdateCommentInput) {
    const comment = await CommentModel.findByIdAndUpdate(id, input).orFail(() => Error('Comment not found'));
    await comment.populate({ 
      path: 'author',
      select: '_id, name',
    });
    return comment;
  }
  
  // eslint-disable-next-line
  async deleteComment(input: DeleteCommentInput) {
    const comment = await CommentModel.findByIdAndDelete(input._id).orFail(() => Error('Comment Not found'));
    await comment.populate({ 
      path: 'author',
      select: '_id, name',
    });
    return comment;
  }

}

export default CommentService;

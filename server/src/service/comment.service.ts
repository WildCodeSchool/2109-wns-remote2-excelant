import { ApolloError } from 'apollo-server-errors';
import CreateCommentInput from '../schema/Comment/comment.create';
import UpdateCommentInput from '../schema/Comment/comment.update';
import CommentInput from '../schema/Comment/comment.input';
import { CommentModel, TaskModel } from '../schema/index';

class CommentService {

  // eslint-disable-next-line
  async createComment(id: string, input: CreateCommentInput) {

    const task = await TaskModel.findById(id).orFail(() => Error('Not found'));

    const comment = await CommentModel.create(input);
    task.comments.push(comment);
    try {
      await task.save();
    } catch (e: any) {
      throw new ApolloError(e.message);
    }
    await comment.populate({
      path: 'user',
      select:
        '_id, name',
    })
    return comment;
  }

  // eslint-disable-next-line
  async updateComment(id: string, input: UpdateCommentInput) {
    const comment = await CommentModel.findByIdAndUpdate(id, input, {new: true}).orFail(() => Error('Not found'));
    await comment.populate({
      path: 'user',
      select:
        '_id, name',
    })
    return comment;
  }
  
  // eslint-disable-next-line
  async deleteComment(input: CommentInput) {
    const comment = await CommentModel.findByIdAndDelete(input._id).orFail(() => Error('Not found'));
    await comment.populate({
      path: 'user',
      select:
        '_id, name',
    })
    return comment;
  }

}

export default CommentService;

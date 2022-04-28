import CreateCommentInput from '../schema/Comment/comment.create';
import { CommentModel } from '../schema/index';
import DeleteCommentInput from '../schema/Comment/comment.delete';

class CommentService {
  // eslint-disable-next-line
  async findComments() {
    const comments = await CommentModel.find().lean();
    return comments;
  }

  // eslint-disable-next-line
  async createComment(input: CreateCommentInput) {
    const comment = await CommentModel.create(input);
    return comment;
  }

  // eslint-disable-next-line
  async deleteComment(input: DeleteCommentInput) {
    const comment = await CommentModel.findByIdAndDelete(input._id);
    return comment;
  }
}

export default CommentService;

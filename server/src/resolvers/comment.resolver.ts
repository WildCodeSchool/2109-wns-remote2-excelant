import { Mutation, Arg } from 'type-graphql';
import CreateCommentInput from '../schema/Comment/comment.create';
import CommentInput from '../schema/Comment/comment.input';
import Comment from '../schema/Comment/comment.schema';
import CommentService from '../service/comment.service';


class CommentResolver {
  constructor(private commentService: CommentService) {
    this.commentService = new CommentService();
  }

  @Mutation(() => Comment)
  createComment(@Arg('_id') id: string, @Arg('input') input: CreateCommentInput) {
    return this.commentService.createComment(id, input);
  }

  @Mutation(() => Comment)
  updateComment(@Arg('_id') id: string, @Arg('input') input: CreateCommentInput) {
    return this.commentService.updateComment(id, input);
  }

  @Mutation(() => Comment)
  deleteComment(@Arg('input') input: CommentInput) {
    return this.commentService.deleteComment(input);
  }

}

export default CommentResolver;

import { Mutation, Query, Arg } from 'type-graphql';
import CreateCommentInput from '../schema/Comment/comment.create';
import Comment from '../schema/Comment/comment.schema';
import CommentService from '../service/comment.service';
import DeleteCommentInput from '../schema/Comment/comment.delete';

class CommentResolver {
  constructor(private commentService: CommentService) {
    this.commentService = new CommentService();
  }

  @Query(() => [Comment])
  findAllComments() {
    return this.commentService.findComments();
  }

  @Mutation(() => Comment)
  createComment(@Arg('input') input: CreateCommentInput) {
    return this.commentService.createComment(input);
  }

  @Mutation(() => Comment)
  deleteComment(@Arg('input') input: DeleteCommentInput) {
    return this.commentService.deleteComment(input);
  }
}

export default CommentResolver;

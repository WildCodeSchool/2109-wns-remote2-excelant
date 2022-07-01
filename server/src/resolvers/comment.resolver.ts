import { Mutation, Query, Arg } from 'type-graphql';
import CreateCommentInput from '../schema/Comment/comment.create';
import UpdateCommentInput from '../schema/Comment/comment.update';
import DeleteCommentInput from '../schema/Comment/comment.delete';
import Comment from '../schema/Comment/comment.schema';
import CommentService from '../service/comment.service';


class CommentResolver {
  constructor(private commentService: CommentService) {
    this.commentService = new CommentService();
  }
  

  @Query(() => [Comment])
  findAllCommentsByTask(@Arg('_id') id: string) {
    return this.commentService.findAllCommentsByTask(id);
  }

  @Mutation(() => Comment)
  createComment(@Arg('input') input: CreateCommentInput) {
    return this.commentService.createComment(input);
  }

  @Mutation(() => Comment)
  updateComment(@Arg('_id') id: string, @Arg('input') input: UpdateCommentInput) {
    return this.commentService.updateComment(id, input);
  }

  @Mutation(() => Comment)
  deleteComment(@Arg('input') input: DeleteCommentInput) {
    return this.commentService.deleteComment(input);
  }

}

export default CommentResolver;

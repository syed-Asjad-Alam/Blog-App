const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
      refOfBlog: {
        type: mongoose.Schema.ObjectId,
        ref: "Blog",
        required: [true, "Comment must belong to a post"],
      },
      refOfUser: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Comment must belong to a User"],
      },
      comment: {
        type: String,
        required: [true, "Comment can not be empty"],
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
      updated_at: {
        type: Date,
        default: Date.now(),
      },
    },
    {
      toJSON: { virtuals: true }, //it is imp when we are doing referencing
      toObject: { virtuals: true },
    }
  );


  CommentSchema.pre(/^find/, function (next) {
    // This middleware lets you get user details who posted comment
    this.populate({
      path: "refOfUser",
      select: "firstName lastName",
    })
    next();
  });
  

  const comment = mongoose.model("Comment", CommentSchema); // it will create a collection with commentSchema
  module.exports = comment;
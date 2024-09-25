import Post from "../models/post.model.js";

// POST
export async function createPost(req, res) {
  try {
    const { title, content } = req.body;
    console.log("Received post data:", req.body); // Logge die empfangenen Daten

    // Überprüfen, ob die erforderlichen Felder vorhanden sind
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const newPost = new Post({
      title,
      content,
      author: req.user.id, 
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error); // Logge den Fehler
    res.status(500).json({ message: "Error while creating the post", error: error.message });
  }
}


// DELETE
export async function deletePost(req, res) {
  try {
    const { postId } = req.params;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting the post", error });
  }
}

// PATCH
export async function updatePost(req, res) {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Error while updating the post", error });
  }
}

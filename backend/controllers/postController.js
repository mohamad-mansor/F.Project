import Post from "../models/post.model.js"; 

// POST
export async function createPost(req, res) {
  try {
    const { title, content, author } = req.body;

    const newPost = new Post({
      title,
      content,
      author, 
    });

    await newPost.save();

    res.status(201).json({ message: "Post créé avec succès", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du post", error });
  }
}

//DELETE
export async function deletePost(req, res) {
  try {
    const { postId } = req.params;

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post non trouvé" });
    }

    res.status(200).json({ message: "Post supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du post", error });
  }
}

// PATCH
export async function updatePost(req, res) {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(postId, { title, content }, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post non trouvé" });
    }

    res.status(200).json({ message: "Post mis à jour avec succès", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du post", error });
  }
}
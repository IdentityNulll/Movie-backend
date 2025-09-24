const Movie = require("../modules/dataModules")

exports.createMovie = async (req, res) => {
    try {
        const newMovie = new Movie({
            ...req.body,
            poster: req.files?.poster
            ? `/uploads/posters/${req.files.poster[0].filename}`
            : null,
            video : req.files?.video
            ? `/uploads/videos/${req.files.video[0].filename}`
            : null,
        })

        await newMovie.save()
        res.status(200).json(newMovie)
    }catch (err) {
        res.status(500).json({err: err.message})
    }
}

exports.getMovies = async (req, res) => {
    try{ 
        const movies = await Movie.find().sort({createdAt: -1})
        res.json(movies)
    }
    catch(err) {
        res.status(500).json({err: err.message})
    }
}

exports.getMovieById = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({message: "Movie Not found"})
        }
        res.json(movie)
    }
    catch (err) {
        res.status(500).json({err: err.message})
    }
}

exports.updateMovie = async (req, res) =>{
    try {
        const updateData = {...req.body};

        if (req.files?.poster) {
            updateData.poster = `/uploads/posters/${req.files.poster[0].filename}`
        }
        else if (req.files?.video) {
            updateData.video = `/uploads/video/${req.files.video[0].filename}`
        }
        
        const updatedMovie= await Movie.findByIdAndUpdate (
            req.params.id,
            updateData,
            {new: true}
        )
        if (!updatedMovie) {
            return res.status(404).json({message: "Movie Not Found"})
        }
        res.json(updatedMovie)
    }
    catch (err) {
        res.status(500).json({err: err.message})
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id)
        if (!deletedMovie) {
            return res.status(404).json({message: "Movie Not found"})
        }
    }   
    catch(err) {
        res.status(500).json({err: err.message})
    }
}

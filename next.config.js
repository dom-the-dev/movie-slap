module.exports = {
    reactStrictMode: true,
    images: {
        domains: [
            process.env.NEXT_PUBLIC_SUPABASE_STORAGE_HOST,
            "www.themoviedb.org",
            "image.tmdb.org"
        ]
    }
}

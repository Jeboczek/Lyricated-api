export default interface PutLyricRequest {
    seconds: number;
    movie_id: number;
    quality: number | null;
    episode_id: number | null;
}

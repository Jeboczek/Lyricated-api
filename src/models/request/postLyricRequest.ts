export default interface PostLyricRequest {
    movieId: number;
    episodeId: number;
    seconds: number;
    quality?: number;
}

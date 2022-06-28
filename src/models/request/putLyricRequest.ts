export default interface PutLyricRequest {
    seconds: number;
    quality: number | null;
    movieId: number;
    episodeId: number;
}

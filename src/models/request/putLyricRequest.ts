export default interface PutLyricRequest {
    seconds: number;
    movieId: number;
    quality: number | null;
    episodeId: number | null;
}

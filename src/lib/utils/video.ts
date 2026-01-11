export function isVideo(src?: string) {
	return !!src && /\.(mp4|webm|mov)(\?.*)?$/i.test(src);
}

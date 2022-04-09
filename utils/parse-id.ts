export default function parseTweetId(ref: string): string | undefined {
    try {
        const url = new URL(ref);
        const components = url.pathname.split('/');
        if (components && components.length > 0) {
            return components[components.length - 1];
        } else {
            return undefined;
        }
    } catch (e) {
        return undefined;
    }
}

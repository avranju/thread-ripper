export enum SplitNumberPosition {
    None = 0,
    Beginning = 1,
    End = 2,
}

// The text needs to be split on word boundaries. If the split number needs
// to be included in each split, then the number of characters that would
// consume needs to be taken into account when determining the split. We do
// not know ahead of time the number of splits we will have at the end. So
// we do this in 2 passes. First we assume we will have less than 10 splits
// and so including the split number in each split will only consume 6
// characters. If it turns out that greater than 9 splits are needed then we
// do a second pass where the split number will consume 8 characters.

function nextSplit(
    input: string,
    startIndex: number,
    maxLen: number,
    splitNumberLen: number
): number {
    const newMaxLen = maxLen - splitNumberLen;
    let endIndex = Math.min(input.length, startIndex + newMaxLen);
    while (endIndex < input.length && endIndex > 0 && input[endIndex] !== ' ') {
        endIndex--;
    }

    return endIndex;
}

function doPass(
    input: string,
    maxLen: number,
    splitNumberLen: number
): number[][] {
    let startIndex = 0;
    let endIndex = 0;
    let splits = [];

    do {
        endIndex = nextSplit(input, startIndex, maxLen, splitNumberLen);
        splits.push([startIndex, endIndex]);
        startIndex = endIndex + 1;
    } while (endIndex < input.length);

    return splits;
}

export default function splitText(
    input: string,
    maxLen: number,
    splitNumberPosition: SplitNumberPosition
): string[] {
    let splitNumberLen =
        splitNumberPosition === SplitNumberPosition.None ? 0 : 6;
    let splits = doPass(input, maxLen, splitNumberLen);

    if (splitNumberPosition !== SplitNumberPosition.None && splits.length > 9) {
        splitNumberLen = 8;
        splits = doPass(input, maxLen, splitNumberLen);
    }

    switch (splitNumberPosition) {
        case SplitNumberPosition.Beginning:
            return splits.map(
                ([start, end], index) =>
                    `(${index + 1}/${splits.length}) ${input.substring(
                        start,
                        end
                    )}`
            );
        case SplitNumberPosition.End:
            return splits.map(
                ([start, end], index) =>
                    `${input.substring(start, end)} (${index + 1}/${
                        splits.length
                    })`
            );

        default:
            return splits.map(([start, end]) => input.substring(start, end));
    }
}

import { sortingFinished } from "../SortVisualizer/SortVisualizer";
import { timer, updateBar, setBarState } from "../SortVisualizer/Sorter";

export async function mergeSort(length) {
    console.log("Starting Merge Sort.");

    let A = Array.from(document.querySelectorAll(".bar")).map((e) => { return Number(e.dataset.value) }),
        B = [];

    copyArray(A, 0, Number(length), B);
    await splitMerge(B, 0, Number(length), A);

    sortingFinished();
}

async function splitMerge(B, start, end, A) {
    if (end - start <= 1) return;

    let middle = Math.ceil((end + start) / 2);
    await splitMerge(A, start, middle, B);
    await splitMerge(A, middle, end, B);
    await merge(B, start, middle, end, A);
}

async function merge(A, start, middle, end, B) {
    let i = start, j = middle;

    for (let x = start; x < end; ++x) {
        setBarState(x, "sorted", true);
    }

    for (let k = start; k < end; ++k) {
        if (i < middle && (j >= end || A[i] <= A[j])) {
            B[k] = A[i];
            i++;
        }
        else {
            B[k] = A[j];
            j++;
        }

        updateBar(k, B[k]);
        await timer();
    }
}

function copyArray(A, start, end, B) {
    for (let k = start; k < end; ++k) B[k] = A[k];
}
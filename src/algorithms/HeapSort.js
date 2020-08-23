import { sortingFinished } from "../SortVisualizer/SortVisualizer";
import { log } from '../SortVisualizer/Logger';
import { timer, swap, setBarState } from "../SortVisualizer/Sorter";

export async function heapSort(length) {
    log("Starting Heapsort.");

    let arr = Array.from(document.querySelectorAll(".bar"))
        .map((e) => { return Number(e.dataset.value) });

    let i = Math.floor(length / 2 - 1),
        k = length - 1;

    while (i >= 0) {
        setBarState(i, "current", true);
        await heapify(arr, length, i);
        setBarState(i, "current", false);
        i--;
    }

    while (k >= 0) {
        setBarState(k, "current", true);
        [arr[0], arr[k]] = [arr[k], arr[0]];
        swap(0, k);
        await timer();
        setBarState(k, "current", false);
        setBarState(k, "sorted", true);
        await heapify(arr, k, 0);
        k--;
    }

    sortingFinished();
}

async function heapify(arr, length, i) {
    let largest = i,
        left = i * 2 + 1,
        right = left + 1;

    setBarState(largest, "current", true);

    if (left < length && arr[left] > arr[largest]) largest = left;
    if (right < length && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setBarState(i, "current-min", true);
        swap(i, largest);
        await timer();
        setBarState(largest, "current", false);
        setBarState(i, "current-min", false);
        await heapify(arr, length, largest);
    }
    setBarState(largest, "current", false);
}


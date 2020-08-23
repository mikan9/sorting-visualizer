import { sortingFinished } from "../SortVisualizer/SortVisualizer";
import { log } from '../SortVisualizer/Logger';
import { timer, swap, setBarState } from "../SortVisualizer/Sorter";

export async function quickSort(type) {
    log("Starting Quicksort.");

    let arr = Array.from(document.querySelectorAll(".bar"))
        .map((e) => { return Number(e.dataset.value) });

    await sub_quicksort(arr, 0, arr.length - 1, Number(type));

    sortingFinished();
}

async function sub_quicksort(arr, start, end, type) {
    if (start < end) {
        let p = 0;
        if (type === 0) p = await partition_lomuto(arr, start, end);
        else p = await partition_hoare(arr, start, end);

        await Promise.all([
            sub_quicksort(arr, start, p - (1 - type), type),
            sub_quicksort(arr, p + 1, end, type)
        ]);
    }
}

async function partition_lomuto(arr, start, end) {
    let pivot = arr[end],
        i = start;

    for (let j = start; j < end; ++j) {
        if (arr[j] < pivot) {
            setBarState(i, "current", true);
            setBarState(j, "current", true);
            swap(i, j, false, arr)

            await timer();
            setBarState(i, "current", false);
            setBarState(j, "current", false);
            i++;
        }
    }
    swap(i, end, false, arr);

    await timer();
    return i;
}

async function partition_hoare(arr, start, end) {
    let pivot = arr[Math.floor((end + start) / 2)],
        i = start - 1,
        j = end + 1;

    while (true) {
        do i++; while (arr[i] < pivot)
        do j--; while (arr[j] > pivot)
        if (i >= j) return j;

        setBarState(i, "current", true);
        setBarState(j, "current", true);
        swap(i, j, false, arr);
        await timer();

        setBarState(i, "current", false);
        setBarState(j, "current", false);
    }
}

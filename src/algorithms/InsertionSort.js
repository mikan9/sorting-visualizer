import { sortingFinished } from "../SortVisualizer/SortVisualizer";
import { log } from '../SortVisualizer/Logger';
import { timer, swap, setBarState } from "../SortVisualizer/Sorter";

export async function insertionSort(length) {
    log("Starting Insertion Sort.");
    let i = 1;

    while (i < length) {
        let j = i;

        while (j > 0 && Number(document.getElementById(j - 1).dataset.value) > Number(document.getElementById(j).dataset.value)) {
            setBarState(j, "current", true);
            setBarState(j, "sorted", false);
            swap(j, j - 1, false);

            await timer();
            setBarState(j, "current", false);
            setBarState(j, "sorted", true);

            j--;
        }
        i++;
    }
    sortingFinished();
}
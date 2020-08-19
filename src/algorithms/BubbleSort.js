import { sortingFinished } from "../SortVisualizer/SortVisualizer";
import { timer, swap, setBarState } from "../SortVisualizer/Sorter";

export async function bubbleSort(length) {
    console.log("Starting Bubble Sort.");
    let n = length;

    while (n > 1) {
        let newN = 0;
        for (let i = 1; i <= n - 1; ++i) {
            let valA = Number(document.getElementById(i - 1).dataset.value),
                valB = Number(document.getElementById(i).dataset.value);

            setBarState(i - 1, "current-min", true);
            setBarState(i, "current", true);

            if (valA > valB) {
                swap(i - 1, i, false);
                newN = i;
            }
            await timer();
            setBarState(i - 1, "current-min", false);
            setBarState(i, "current", false);
        }
        n = newN;
    }
    sortingFinished();
}
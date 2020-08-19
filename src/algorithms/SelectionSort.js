
import { sortingFinished } from "../SortVisualizer/SortVisualizer";
import { timer, swap, setBarState, getSortStatus } from "../SortVisualizer/Sorter";

export async function selectionSort(length) {
    console.log("Starting Selection Sort.");
    Array.from(document.querySelectorAll("bar")).forEach(element => {
        element.classList.remove("sorted");
    });


    for (let i = 0; i < length - 1 && getSortStatus(); ++i) {
        let jMin = i;
        document.getElementById(jMin).classList.add("current-min");
        for (let j = i + 1; j < length && getSortStatus(); ++j) {

            let jVal = Number(document.getElementById(j).dataset.value),
                jMinVal = Number(document.getElementById(jMin).dataset.value);
            document.getElementById(j).classList.add("current");

            if (jVal < jMinVal) {
                setBarState(jMin, "current-min", false);
                setBarState(j, "current-min", true);
                jMin = j;
            }

            await timer();
            setBarState(j, "current", false);
        }

        if (jMin !== i) swap(i, jMin, true);
        else if (jMin === i) setBarState(jMin, "sorted", true);

        setBarState(jMin, "current-min", false);
    }

    setBarState(length - 1, "sorted", true);
    sortingFinished();
}

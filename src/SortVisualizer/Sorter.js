import { selectionSort } from '../algorithms/SelectionSort';
import { bubbleSort } from '../algorithms/BubbleSort';
import { insertionSort } from '../algorithms/InsertionSort';
import { calcStyle } from "../SortVisualizer/Visualizer/Bar/Bar";
import { mergeSort } from '../algorithms/MergeSort';
import { quickSort } from '../algorithms/QuickSort';
import { heapSort } from '../algorithms/HeapSort';

const SPEED_MULTIPLIER = 2;
let ms = 50;
let sortStatus = 1; // 0: Stopping 1: Starting

export function Sort(algorithm, length, speed) {
    sortStatus = 1;
    setSpeed(speed);
    switch (Number(algorithm)) {
        default:
        case 0: selectionSort(length); break;
        case 1: bubbleSort(length); break;
        case 2: insertionSort(length); break;
        case 3: mergeSort(length); break;
        case 4: quickSort(0); break;
        case 5: quickSort(1); break;
        case 6: heapSort(length); break;
    }
}

export function stopSort() {
    sortStatus = 0;
}

export function getSortStatus() {
    return sortStatus;
}

export function timer() {
    return new Promise(res => setTimeout(res, ms));
}

export function setSpeed(speed) {
    ms = (100 * SPEED_MULTIPLIER) - (speed * SPEED_MULTIPLIER);
}

export function setBarState(id, state, flag) {
    if (getSortStatus() === 0) return;
    if (flag) document.getElementById(id).classList.add(state);
    else document.getElementById(id).classList.remove(state);
}

export function swap(a, b, markSorted = false, arr = []) {
    if (getSortStatus() === 0) return;
    if (markSorted) setBarState(a, "sorted", true);

    if (arr.length > 1) {
        const x = arr[a];
        arr[a] = arr[b];
        arr[b] = x;
    }

    const temp = document.getElementById(a).dataset.value;
    updateBar(a, document.getElementById(b).dataset.value);
    updateBar(b, temp);
}

export function updateBar(id, value) {
    if (getSortStatus() === 0) return;
    document.getElementById(id).dataset.value = value;
    document.getElementById(id).style.height = calcStyle(document.getElementById(id).dataset.value).height;
    document.getElementById(id).firstChild.innerText = value;
}

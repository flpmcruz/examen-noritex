
// Que complejidad tiene este algorithmo
for(let i = 0;i < n; i++){ // O(n)
    for(let j=0;j < n - 1; j++){ // O(n)
        if(arr[j] > arr[j+1]){ // O(1)
            var temp = arr[j]; // O(1)
            arr[j] = arr[j+1]; // O(1)
            arr[j+1] = temp; // O(1) 
       }
    }
}

// Complejidad = O(n^2)
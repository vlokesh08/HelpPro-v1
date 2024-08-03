function edit(description: string): string {
    // Replace all <ul> tags with the desired class names
    let temp = description.replace(/<ul>/g, '<ul class="list-disc list-inside">');
    
    // Replace all <ol> tags with the desired class names
    temp = temp.replace(/<ol>/g, '<ol class="list-decimal list-inside">');
    temp = temp.replace('<h2>', '<h2 class="text-2xl font-bold mt-4 mb-2">');
    temp = temp.replace('<h1>', '<h3 class="text-3xl font-bold mt-4 mb-2">');
    
    return temp;
  }
  
  export default edit;
  
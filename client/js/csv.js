unparseAndDownloadCSV = function (array, filename) {
      var csv = Papa.unparse(array);

      //https://github.com/mholt/PapaParse/issues/175    
      var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
      //IE11 & Edge
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(csvData, filename);
      } else {
        //In FF link must be added to DOM to be clicked
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(csvData);
        link.setAttribute('download', filename);
        document.body.appendChild(link);    
        link.click();
        document.body.removeChild(link);    
      }
};

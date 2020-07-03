


let data



   function getCSVData(){
     data = new Array()
     let  mnemonic = document.getElementById("seed").value
     
     let masterNode = ethers.utils.HDNode.fromMnemonic(mnemonic);

     for (i=0;i<999;i++){
       let address = masterNode.derivePath("m/44'/60'/0'/0/" + i);
       let datapoint = new Object()
       datapoint.address = address.address
       data.push(datapoint)     }
   }

   function download_csv() {
     getCSVData()
       var csv = 'Address,Addresses\n';
       data.forEach(function(datapoint) {
               csv += datapoint.address;
               csv += ",";
               csv += "\n";
       });

       var hiddenElement = document.createElement('a');
       hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
       hiddenElement.target = '_blank';
       hiddenElement.download = 'Addresses.csv';
       hiddenElement.click();
   }

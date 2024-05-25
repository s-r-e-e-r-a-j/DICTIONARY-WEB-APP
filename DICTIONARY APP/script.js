//coded by sreeraj
          

var meaning=document.querySelector("#meaning");
var word=document.querySelector("#word");

var searchbutton=document.querySelector("#searchbtn").addEventListener("click",GetMeaning);
var speech=new SpeechSynthesisUtterance();


function GetMeaning(){
  
  var input=document.querySelector("#input");
  var value=input.value;
  word.innerHTML=value;

  if(value==""){
    word.innerHTML=null
    meaning.innerHTML=null
  }


  var api=`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`

   //fetch is used to get data from the server with api

  fetch(api).then((response)=>response.json())

     .then((dataoutput)=>{
      console.log(dataoutput)

     meaning.innerHTML=dataoutput[0].meanings[0].definitions[0].definition;


     speech.text=`Meaning of ${value}. ${dataoutput[0].meanings[0].definitions[0].definition}`

     speech.rate=0.8;
     speech.pitch=0.8;
     speech.lang="en-US"||"en-GB"||"en-UK"
     speechSynthesis.speak(speech)





     }).catch((error)=>{
      word .innerHTML="Not found or wrong word" 
      meaning.innerHTML="Error Occured Not found that word plese enter correct word<br>ആ വാക്ക് കണ്ടെത്താൻ കഴിയുന്നില്ല.ശരിയായ വാക്ക് നൽകുക"
    
      

     })


}


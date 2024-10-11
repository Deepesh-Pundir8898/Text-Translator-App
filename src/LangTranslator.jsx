import React, { useState } from 'react';
import { LangDropdown } from './LangDropdown';
import { supportedLanguages } from './static/langCode';
import axios from 'axios';

export const LangTranslator = () => {
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [textInput, setTextInput] = useState('');
  const [translationResult, setTranslationResult] = useState('');

  const TranslateTextHandler = async () => {

    if (!sourceLanguage || !targetLanguage || !textInput) {
      alert("Please select both languages and enter text");
      return;
    }
  
    const data = new FormData();
    data.append('source_language', sourceLanguage); 
    data.append('target_language', targetLanguage); 
    data.append('text', textInput); 
  
    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'x-rapidapi-key': '6e61ef2cccmsh7949b64362b2997p118ae5jsn9f28fc3ba4ee',
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com',
      },
      data: data,
    };
  
    try {
      const response = await axios.request(options);
      if (response.data && response.data.data) {
        setTranslationResult(response.data.data.translatedText); 
      } else {
        setTranslationResult("Translation failed");
      }
    } catch (error) {
      console.error(error);
      setTranslationResult("Error occurred during translation");
    }
  };
  

  return (
    <>
      <h1>Language Translator</h1>
      <div className='container'>
        <div className="Input-container">
            <LangDropdown
            label="Source Language"
            languages={supportedLanguages}
            targetLang={setSourceLanguage}
            />
            <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter text..." rows={10} cols={40}
            ></textarea>
        </div>

        <div className='result-container'>
            <LangDropdown
            label="Target Language"
            languages={supportedLanguages}
            targetLang={setTargetLanguage}
            />
            <textarea
            value={translationResult}
            placeholder="Translated Result"
            disabled  rows={10} cols={40}
            ></textarea>
        </div>
      </div>
        <button onClick={TranslateTextHandler}>Translate</button>
      
    </>
  );
};

import React from 'react'

export const LangDropdown = ({label , languages , targetLang }) => {
  return (
    <>
    <label htmlFor={label}>{label}</label>
    <select name="" id={label} onChange={(e)=>targetLang(e.target.value)}>

        {Object.entries(languages).map(([languageName, languageCode]) => (
            <option key={languageCode} value={languageCode}>
            {languageName}
            </option>
        ))}

    </select>

</>
  )
}

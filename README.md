# frontend-knowledge

`Vue3` + `Pinia` + `Volar` - Project Example

## Project description
Pinia Knowledge is an example of a personal knowledge manager, where the user saves the courses they want to follow, quite similat to a ToDo list.

The features include:
- Listing courses
- Adding course
- Modifying a course
- Deleting a course

The data is managed using `Firebase` as DB, where all courses are saved.

<details> 
 <summary><h2>Initial Setup</23></summary>
  Create a `.env` or `.env.local` file in the project's root folder, with the URL value of your `Firebase` DB as `VITE_API_URL`.
  
  ### Recommended IDE Setup
  
  [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
  
  ### Customize configuration
  
  See [Vite Configuration Reference](https://vitejs.dev/config/).

</details>


<details> 
 <summary><h2>Project Setup</h2></summary>

 ```sh
 npm install
 ```
 
 ### Compile and Hot-Reload for Development
 
 ```sh
 npm run dev
 ```
 
 ### Compile and Minify for Production
 
 ```sh
 npm run build
 ```
</details>


## Deployed?
[Example deployed here!](https://peppy-gnome-436003.netlify.app)

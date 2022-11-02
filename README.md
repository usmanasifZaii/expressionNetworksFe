# Running project locally

This project is a simple application to manage a list of items.

1. To run the project successfully first create a new file `.env.development.local`
2. Create env variables as depicted in `.env.development.local.example` file
3. Run following command in terminal from the root of your project

```
yarn install
```

4.

```
yarn run dev
```

# Functionalities

1. CRUD operations for item
2. Persistant data on item creation form i.e If I stop the application and restart it, the data changes are not lost
3. Paginated list view of items
4. Type property picked from a list of options provided by a nodejs backend for item creation

# Tools and Libraries

1. React
2. ElasticUI
3. Moment
4. Axios

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

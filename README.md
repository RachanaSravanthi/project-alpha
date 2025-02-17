# Project-alpha

This project is built with React and Vite, offering a modern and fast development environment.

## Getting Started

To updating the website we need to open the repository and do the following steps
  A. Installation
  B. Make required changes
  C. Run the project
  D. Build for Production
  E. commmit and Push to Github


### Installation

1. Clone the repository or Directly opening it in github.dev :
```bash
git clone [your-repository-url]
cd [your-project-name]
```

-or-

* Open the project file in github

* In the url shown in github , replace .com with .dev 

ex:
   https://github.com/RachanaSravanthi/project-alpha   to  https://github.dev/RachanaSravanthi/project-alpha

*Open the terminal my Cntrl + ` (backtick)


2. Install dependencies:
```bash
npm install
```

This command will install all necessary dependencies defined in `package.json`.


### Run the project inn development server
```bash
npm run dev
```

This command:
- Starts the development server
- Opens the app at [http://localhost:5173](http://localhost:5173)
- Or press Cntrl and click the url
- Enables hot module replacement (HMR)
- Shows lint errors in the console

### Build for Production

```bash
npm run build
```

if you get "✓ built in 3.42s" this message you are good to go

This command:
- Builds the app for production to the `dist` folder
- Bundles React in production mode
- Optimizes the build for best performance
- Minifies files and includes hashes in filenames

The app is ready to be deployed!

### Push to github
You can do this using command line or directly using github dev :

1. Using command line :
```bash
git add .
git commit -m "Message"
git push

```
2. Using github dev :
 
  a. Click on source control icon in the left corner

  b. Type the message and click commit 

  c. Click on sync

The app is deployed!

## Project Structure

```
your-project/
├── dist/              # Production build files
├── public/            # Public assets
├── src/               # Source files
│   ├── assets/        # Images, fonts, etc.
│   ├── components/    # React components
│   ├── App.tsx        # Root component
│   └── main.tsx       # Entry point
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## Development

- Files in `src/` are processed by Vite and TypeScript
- Files in `public/` are served as-is
- Add environment variables in `.env` files

## Deployment

After running `npm run build`:
1. The `dist` directory will contain your compiled code
2. Deploy the contents of `dist` to your hosting provider
3. For static hosting, configure redirects to `index.html`

## Additional Information

- Built with Vite for fast development and builds
- Uses React for UI components
- TypeScript for type safety
- Tailwind CSS for styling

# vh-dev-training

## Quick Note on Learning

We have 5 one hour meetings to do this with a little additional time for homework. Y'all are here because we thought you'd be good VH members and be able to learn what you needed to learn to help build the best technical infrastructure of any hackathon. That means, you should be trying your best and aggressively asking questions when you don't know something. _This is not the time to be shy about not knowing something; this is the time to try and expedite your learning as much as possible._

## Getting started with Node development

Regardless of platform, you should have a VSCode installation that you're happy with (a nice theme, extensions you like and so on). I'm sure there will be plenty of people in #dev with opinions for you if you want them.

You should fork this repo on GitHub so you have your own version. Then git clone it somewhere on your system.

### If you have a Mac:

Open terminal and do this:

If you have Homebrew: `brew install node`
Otherwise: `curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"`

### If you have a Windows machine:

This is super annoying. If you already have a good terminal setup that you're happy with, stick with that (you shouldn't be happy with the setup that 2201/3251 gives you). Otherwise, follow the WSL instructions.

#### WSL

1. Hit the Windows key, type in Powershell, right click the icon and open as adminstrator. Then paste in: `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`.
2. Update your Windows.
3. Go the Microsoft store, search Ubuntu (if you are really fond of some other distribution's terminal's quirks, you can use that) and download it.
4. Search for "Ubuntu" using the same way we found Powershell. It'll ask for a username and password. Since someone can only ask for this if they know your Windows password (in which case you have bigger problems...), I strongly suggest you make this simple.
5. Run `sudo apt-get update && apt-get upgrade` repeatedly until the command does nothing.
6. After that `curl -sL https://deb.nodesource.com/setup_10.x | sudo bash - && sudo apt install nodejs`

### If you have Linux:

I assume you understand terminal well enough to do the right thing: [https://nodejs.org/en/download/package-manager/#macos](https://nodejs.org/en/download/package-manager/)

## Testing your node version

Type in `node -v` into terminal. You should get a version number. Do the same thing with npm: `npm -v`. Post in channel if either don't work.
If both work, cd into this repo's directory (again, contact on Slack if you don't know how to do this) and type in "npm i". **It will take a long time. That is normal. Just don't close the terminal**.

## Other stuff

I have tried to replicate the linting and Typescript configs for Vaken as closely as possible. I strongly suggest you install the recommended extensions - they provide a lot of helpful context.

## Deploy it

Do this for your first homework. We'll give instructions associated with each homework for how to deploy. I strongly recommend not hitting the button until _after_ your code works. After hitting the button, you'll have to create an account and then Heroku will walk you through it.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy) [![Greenkeeper badge](https://badges.greenkeeper.io/VandyHacks/vh-dev-training.svg)](https://greenkeeper.io/)

# Rechaptca - Captcha Challenge Game

![](screenshots/cover.png)

## Inspiration

Our inspiration for "Rechaptca" came from a frustrating experience: failing a captcha while trying to register for a Devpost account. Rather than dwelling on the annoyance, we saw an opportunity to turn our misfortune into a captivating and enjoyable game, allowing everyone to share in the amusement of solving captchas!

## What it does

"Rechaptca" challenges players with a series of captivating, tricky, and downright difficult captchas. With varying time limits, reactions, and general knowledge tests, the game promises an entertaining experience for all!

![](screenshots/landing-page.png)
![](screenshots/challenge-1.png)
![](screenshots/challenge-2.png)
![](screenshots/challenge-3.png)
![](screenshots/challenge-4.png)

## How we built it

We used React.JS and Mantine for the component library, alongside with various APIs such as Youtube for more interesting challenges!

## Challenges we ran into

The time frame was extremely tight, and we were not able to implement many of the more interesting challenges we had in mind. However, we decided to make sure the core of the game is still fun and interesting for all players!

## Accomplishments that we're proud of

- First physical hackathon for the entire team!
- Making a MVP in under 24 hours
- Enjoying the process

## What we learned

- Learnt about the intricacies of the React.JS framework
- Learnt about the different kinds of captchas, and how they work under the hood
- Learnt about each other and how different our schools are from each other

## What's next for Rechaptca

- More challenging puzzles
- More annoying games
- Ranked timings and scores
- Multiplayer battle!



## Setup

Pull and cd

```
git clone https://github.com/tohhongxiang123/rechaptca
cd rechaptca
```
Create `.env`

```
cp .env.example .env
# fill up .env files with appropriate values
```

Install dependencies and run

```
yarn
yarn dev
```
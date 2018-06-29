# a11y-dashboard-connector
Run competetive Accessibility tests and send them to a Graphite db

## High level overview

- Run with `yarn start` which only does `node index.js`.
- The `index.js` only itereates over a list of urls and "queues" them async to `run`.
- The `run` function in `main.js` runs pa11y for each URL and pa11y returns a report (big array of issues)
  - The report is saved as JSON file into the `reports` folder
  - The report is processed by different filters
  - Each filter takes a pa11y report as input and returns one or multiple values (calculated/filtered data).
- The values are put to the function `sendStats`.
- `sendStats` glues the values together into an objext, which is sent to Graphite.
  - The object structure and the key names represent the hierarchy in which you will find the data inside Graphite.

## Run & Deploy

| Command | What's happening? |
| ------  | --------- |
| `make build` | generate new Docker-Image with current revision |
| `make test`  | run most recent Docker-Image based on revision  |
| `make k8s`   | deploy most recent Docker-Image based on revision to Kubernetes-Cluster as a Cronjob|

The Cronjob is accessible through the [Kubernetes-Dashboard](http://217.13.69.11:8080/r/projects/1a5/kubernetes-dashboard:9090/#!/cronjob?namespace=default) (view logs etc.)

## To-do

## Clean up

- `index.js` is a lot of unreadable boilerplate.
- naming things: make clear which part is pa11y, which is grafana-connection, which are _our_ filters, which is code to tape things together
- send each report result to Graphite, instead of glueing it together in the `sendStats` function

## Make this usable for others

- The list of urls should come from a config file!
  - how to abstract the site-type (hp, centerpage, article) away??
- Command Line Interface (params: which sites, graphite url)


## Feature Ideas

- axe for analyses: reports good parse-able advice (Violation of "color-contrast" with 108 occurrences!)
- exclude elements like ads (look for "hide elements" in https://bitsofco.de/pa11y/) ... if this makes sense. Maybe as an extra report: issues with and without ads ?

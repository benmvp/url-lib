# Contributing to `url-lib`

Thank you for your interest in contributing to `url-lib`!

## Table of Contents

* [Setup](#setup)
* [Branches](#using-branches-to-submit-changes)
* [Keeping up to date](#keeping-your-local-repo-up-to-date)
* [Creating issues](#creating-issues)
* [Working on and submitting changes](#working-on-and-submitting-changes)
* [Steps to submit](#steps-to-submit)

## Setup

1. This project uses [yarn](https://yarnpkg.com/en/) as a package management system. If you don't have it installed, you can follow the [installation instructions](https://yarnpkg.com/lang/en/docs/install/)
1. [For the repository](https://help.github.com/articles/fork-a-repo/)
1. Clone your new forked repository to your local computer
1. Set the `benmvp` repository as your branch's upstream branch: `git remote add upstream https://github.com/benmvp/url-lib.git`
1. Navigate to the root directory of your newly cloned repository: `cd /path/to/url-lib`
1. `yarn install` to install local dependencies

## Using branches to submit changes

To work on changes, create a new branch on your local repository. `git checkout -b <your-new-branch-name>`

## Keeping your local repository up to date

To ensure your branch never gets out of sync with benmvp's `master`, ensure that you have your upstream set properly (see the [Setup](#setup) step)

1. `git checkout master` (you may have to [stash](https://git-scm.com/book/en/v1/Git-Tools-Stashing) or commit your local changes)
1. `git pull upstream master`
1. `git checkout <your-new-branch-name>`
1. `git rebase master`
1. If you've stashed changes, [unstash](https://git-scm.com/book/en/v1/Git-Tools-Stashing) them now, otherwise your branch should now be up to date

Always try to keep your `master` "clean" by only pulling changes directly from `upstream` into your master branch and rebasing those changes onto your working branch.

It is always a good idea to pull the upstream branch in to your master branch before creating a new feature branch to work from. This will minimize the chances of encountering merge conflicts.

## Creating Issues

Create issues to file bugs, changes, and proposals.

Before opening a new issue, please [search](https://github.com/benmvp/url-lib/issues) to see if there has been previous discussion about the same feature or issue. If so, please contribute to the discussion there.

If nothing is found, feel free to [open a new issue](https://github.com/benmvp/url-lib/issues) and fill out the issue template to the best of your ability.

## Working on and submitting changes

When starting on improvements or new features that are non-trivial, it is always a good idea to first discuss the changes you wish to implement by [opening a github issue](https://github.com/benmvp/url-lib/issues) before getting started.

If you've found a bug or feature you'd like to work on in our [github issue tracker](https://github.com/benmvp/url-lib/issues), please comment on the issue to let others know that you'd like to work on it.

While implementing fixes, please try to change as little code as possible. This helps speed up the review process and helps diminish the chance of additional bugs.

Please try to conform to the coding style of the code base.

## Steps to submit:

1. Please ensure that your changes are fully covered by one or more unit test(s).
1. Check to make sure that your changes are documented properly (inline comments for interesting lines, READMEs, etc.)
1. Run `yarn test` to ensure that all tests pass, the linter is satisfied and your changes are typescript compliant.
1. PR titles must be prefixed by the type of changes the PR contains followed by the scope of what the PR touches. We are following the [angular commit guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). Please use one of `feat, fix, docs, style, refactor, perf, test, chore` as the prefix. The " is the the direct product your changes affect. Example: `chore(build): Add encrypted ssh key for semantic-release` because its a chore and it touches the build. For multiple scope items, you can comma separate 2 or 3 but if there are more than that please use a `*` instead.
1.  Please use a [closing issue keyword](https://help.github.com/articles/closing-issues-using-keywords/) to indicate the issue that your fix addresses in the description section of the pull request template. Example: `fixes #32` to close issue #32

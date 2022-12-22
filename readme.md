# Group'em

## Intro

This project aims to build a tool for splitting a main group of names randomly into smaller sub-groups. This tool was intended to be used as an ice breaking tool for a group of 15 students by splitting them randomly into groups of 3.
Why 3? It is the author's belief that 3 is an optimal number for a team to work efficiently together. You may wish to read https://www.forbes.com/sites/jaimepotter/2020/04/27/the-ideal-team-size-at-work-may-be-smaller-than-you-think/?sh=2ca47bd2630a

## Tech used

HTML, CSS, vanilla Javascript, css elements from getbootstrap.com

## How to use

The interface will allow a user to add a name individually or a group of names(separated by a space) to their screen. Names added will also be attached with its own delete feature for user to remove names. User then enters a limited choice of the size (number of members) of the sub-group that they want to split their main group into.

User can then click to generate the first session of randomised sub-grouping and click again for subsequent sessions of randomised sub-grouping.

Limitations and unsolved problems will be explained in the last section of this document.

## Approach

To create the first randomised session of sub-grouping the program:
-the list of names added are stored in an array
-the array is then randomised
-the randomised array is then popped into a new array that represents a sub-group
-this sub-group array is then pushed into the main array
-the new array will now have nested arrays of sub-groups

-

## Limitations and Unsolved Problems

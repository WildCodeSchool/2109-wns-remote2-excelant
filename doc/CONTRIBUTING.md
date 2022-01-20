# Contributing

## Git workflow

- **Get latests changes on dev branch**

    ```shell
    $ git checkout dev
    $ git pull origin dev
    ```

- **Create a new branch**

    ```shell
    $ git checkout -b <branch-name>
    ```

- **Make your changes/add new code**

- **Commit your changes**

    ```shell
    $ git add <files-to-stage>
    $ git commit
    ```

    Commit message format using [conventional commits](https://www.conventionalcommits.org)

    ```
    feat(scope): commit message     -> new feature
    refactor(scope): commit message -> refactorization
    fix(scope): commit message      -> fix to something
    doc(scope): commit message      -> documentation (readme, contributing, etc)
    chore(scope): commit message    -> changes made to the projects configuration
    ```
    _`scope` stands for the main file you are working on, and is optional (ex: `feat: commit message`)_

- **Get latests changes from base branch**

    Use interactive rebase feature :

    ```shell
    $ git rebase -i --autosquash <base-branch-name>
    ```
    _Maybe make an alias for this one_

- **Resolve conflicts**

    After resolving a conflicted file just `git add <file-name>`

- **Continue interactive rebase**

    ```shell
    $ git rebase --continue

    # Cancel rebase with
    $ git rebase --abort
    ```

- **When rebasing is done**
    
    Check if your commits are good with this awesome command
    
    ```shell
    $ git log --oneline --graph
    ```
    _You might also make an alias for this one_

- **Push your up to date branch**

    ```shell
    $ git push origin <branch-name>

    # or, in case of rebase or amended commits
    $ git push origin <branch-name> --force-with-lease
    ```

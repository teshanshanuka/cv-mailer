# CV builder + mailer

## Setup

1. Fork this repository
1. Add your CV latex files to the `cv` folder
1. Make sure your main latex file is `cv/cv.tex`
1. To send the email through a gmail account, create an [app password](https://support.google.com/mail/answer/185833?hl=en)
1. Add following "[repository secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository)" to your fork
   * `APP_EMAIL` - your gmail account email to send as
   * `APP_PWD` - your gmail app password created in the previous step
   * `TO_EMAIL` - the email address(es) to send to

Now the action will take care of the rest. You can change email content and settings in `.env` file.

## Manually building the CV

To build with the docker latex image, run

```sh
docker run --rm -v "$(pwd):/cv" latex sh -c 'cd /cv/cv && latexmk -cd -f -lualatex -interaction=nonstopmode -synctex=1 cv.tex -jobname=cv'
```

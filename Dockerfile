# TalkyHub docs site — runtime image.
#
# The static Docusaurus site is built in CI (`npm run build`, with content pulled from talkyhub-docs) and its
# `build/` output is baked into this nginx image. The container serves it on :80; the HOST nginx
# (deploy/nginx/docs.talkyhub.ru.conf) terminates TLS for docs.talkyhub.ru and reverse-proxies to it, exactly
# like the landing/app/api containers. Deliberately NOT a multi-stage node build: cloning the (private) content
# repo needs a token, which belongs in the workflow, not in the image build.
FROM nginx:1.27-alpine

# Serve the static site with clean URLs + a proper 404 (Docusaurus emits <route>/index.html + 404.html).
COPY deploy/container-nginx.conf /etc/nginx/conf.d/default.conf

# The pre-built site (produced by the workflow before `docker build`).
COPY build/ /usr/share/nginx/html/

EXPOSE 80

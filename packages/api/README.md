# @nlw3-happy/api

Este módulo fornece a API para o projeto Happy.

## :wrench: Configuração

Renomeie o arquivo .env.example para .env e configure as variáveis ambiente para sua instância Postgres
```bash
mv .env.example .env
```

```json
TYPEORM_HOST=localhost        // endereço/IP da instância
TYPEORM_PORT=5432             // porta (padrão 5432)
TYPEORM_USERNAME=postgres     // login
TYPEORM_PASSWORD=postgres     // senha
TYPEORM_DATABASE=nlw3-happy   // nome do banco
```

### Providers AWS (opcional)
Configure se desejar o upload de arquivos via S3 ou serviço de envio de emails através do SES.

```bash
# disk (armazenamento local na pasta /tmp/uploads) | s3 (armazenamento cloud na AWS)
STORAGE_DRIVER=disk
```

```bash
# ethereal (simulação e envio de emails fake https://ethereal.email/) | ses (simple email service da aws)
MAIL_DRIVER=ethereal
```

Caso opte por utilizar o STORAGE_DRIVER=s3 ou MAIL_DRIVER=ses, acrescente as credenciais de acesso a AWS com as permissões configuradas no IAM para o serviço desejado.

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
```

Para utilizar o S3 para armazenamento de arquivos, especifique o nome do bucket.
```
AWS_BUCKET_NAME=
```


## :rocket: Inicie o servidor

```
yarn dev:server
```

## Домашнее задание по модулю 2

### Postgresql в patroni сетапе

#### Виртуальные машины:

| Название | Публичный IP  | Приватный IP |
|----------|---------------|--------------|
| balancer | 91.185.85.241 | 10.0.10.7    |
| db-2     | -             | 10.0.10.6    |
| db-1     | -             | 10.0.10.5    |
| etcd-3   | -             | 10.0.10.4    |
| etcd-2   | -             | 10.0.10.3    |
| etcd-1   | -             | 10.0.10.2    |

#### Настройка и запуск ansible playbook

Пароли в ansbile-playbook зашифрованы с помощью Ansible vault.

Изменения в inventory и vars/main.yml можно глянуть [здесь](https://github.com/TheWildBunchPog/teta/commit/1a0ecf0420a3d86fd2cddea2df6a966560d49e82).

```bash
# Запуск ansbile playbook
ansible-playbook --ask-vault-pass deploy_pgcluster.yml
```

### Helm chart weather-api

#### Подготовка бд:

```sql
# Создание бд
CREATE DATABASE weather;
```

```bash
# Выполнение скрипта миграции
 psql -U postgres -h 91.185.85.241 -p 5000 -d weather -f ./migration.sql
```
#### Установка чарта:

```bash
# Предварительно нужно указать пароль от бд в values.yaml
helm upgrade -i teta weather-app/.
```

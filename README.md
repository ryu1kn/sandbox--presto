
# Sandbox: Presto

## Usage

Start Presto DB

```sh
docker run --rm -d -p 8080:8080 --name presto ahanaio/prestodb-sandbox
```

Then to access the DB with Presto CLI

```sh
docker exec -it presto presto-cli
```

The password is actually empty. To connect with IntelliJ, see this: [Presto DB Support. Password Prompt?][1].

### Example - AWS account roles

#### Populating DB

Here, I use AWS account roles data as an example. It takes two steps to prepare data:

1. Dump roles from an AWS account, save it as a JSON file.

    ```sh
    aws iam get-account-authorization-details > data/output.json
    ```

1. Convert the JSON file into an import SQL file, and run it against Presto to import the data.

    ```sh
    make import
    ```

#### Playing with Presto CLI

To start a presto cli:

```sh
make start-cli
```

You can now query the sample data:

```
presto:default> SELECT * FROM role LIMIT 1;

-----------------------------------------------------------------
 {"Path":"/aws-service-role/elasticmapreduce.amazonaws.com/", ...
(1 row)
```

#### Test

Test the logic of converting the account role JSON file into a SQL file.

```sh
make test
```

## References

* [Presto Documentation](https://prestodb.io/docs/current/)
* [Using IntelliJ/DataGrip with Presto JDBC](https://dev.to/pcfleischer/using-intellij-datagrip-with-presto-jdbc-jp8)

[1]: https://intellij-support.jetbrains.com/hc/en-us/community/posts/360007105839/comments/360002341319

import os

import testinfra.utils.ansible_runner

testinfra_hosts = testinfra.utils.ansible_runner.AnsibleRunner(
    os.environ["MOLECULE_INVENTORY_FILE"]
).get_hosts("all")


def test_config_file(host):
    f = host.file("/etc/loki/config.yml")

    assert f.exists
    assert f.user == "root"
    assert f.group == "loki"
    assert f.mode == 0o640


def test_systemd_service_file(host):
    f = host.file("/etc/systemd/system/loki.service")

    assert f.exists
    assert f.mode == 0o644


def test_loki_binary(host):
    f = host.file("/opt/loki/loki-linux-amd64")

    assert f.exists


def test_service(host):
    s = host.service("loki")

    assert s.is_running is True

terraform {
  required_providers {
    proxmox = {
      source = "Telmate/proxmox"
      version = "3.0.2-rc05"
    }
  }
}

provider "proxmox" {
  pm_api_url      = var.proxmox_api_url
  pm_user         = var.proxmox_user
  pm_password     = var.proxmox_password
  pm_tls_insecure = false
  pm_minimum_permission_check = false 
}

resource "proxmox_vm_qemu" "docker" {
  count       = var.vm_count
  name        = "${var.vm_name}-${count.index + 1}"
  description = "VM déployée via Terraform"
  target_node = var.proxmox_node
  agent = 1 
  skip_ipv6 = true
  clone   = var.template_name
  # Ressources VM
  cpu { 
    cores = 1 
    sockets = 1 
  }
  memory  = var.vm_memory
  
  bootdisk = "scsi0"
  
  # Disque (doit correspondre au disque du template)
  disk {
    slot    = "scsi0"
    size    = var.vm_disk_size
    type    = "disk"
    storage = var.storage_name
    # Le volume sera automatiquement créé par le clone
    # Ne pas spécifier de volume ici, juste les paramètres
  }
  # Réseau
  network {
    id = 0
    model  = "virtio"
    bridge = "LAN"
  }
  
  # Configuration Cloud-Init
  os_type   = "cloud-init"
  #ipconfig0 = "ip=${var.vm_ip_base}.${count.index + 10}/24,gw=${var.vm_gateway}"
  
  sshkeys = var.ssh_keys
  tags = "docker,debian"
  # Démarrage automatique
  automatic_reboot = true
}
resource "proxmox_vm_qemu" "BDD" {
  count       = var.bdd_vm_count
  name        = "${var.bdd_vm_name}-${count.index + 1}"
  description = "VM déployée via Terraform"
  target_node = var.proxmox_node
  agent = 1 
  skip_ipv6 = true
  clone   = var.template_name
  cpu { 
    cores = var.vm_cores
    sockets = 1 
  } 
 memory  = var.vm_memory
  
  bootdisk = "scsi0"
  
  # Disque (doit correspondre au disque du template)
  disk {
    slot    = "scsi0"
    size    = var.vm_disk_size
    type    = "disk"
    storage = var.storage_name
    # Le volume sera automatiquement créé par le clone
    # Ne pas spécifier de volume ici, juste les paramètres
  }
  # Réseau
  network {
    id = 0
    model  = "virtio"
    bridge = "LAN"
  }
  
  # Configuration Cloud-Init
  os_type   = "cloud-init"
  #ipconfig0 = "ip=${var.vm_ip_base}.${count.index + 10}/24,gw=${var.vm_gateway}"
  
  sshkeys = var.ssh_keys
  tags = "bdd,debian"
  # Démarrage automatique
  automatic_reboot = true
}

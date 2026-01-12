variable "proxmox_api_url" {
  description = "URL de l'API Proxmox"
  type        = string
}

variable "proxmox_user" {
  description = "Utilisateur Proxmox"
  type        = string
}

variable "proxmox_password" {
  description = "Mot de passe Proxmox"
  type        = string
  sensitive   = true
}

variable "proxmox_node" {
  description = "Nom du nœud Proxmox cible"
  type        = string
}

variable "template_name" {
  description = "Nom du template à cloner"
  type        = string
}

variable "storage_name" {
  description = "Nom du stockage Proxmox"
  type        = string
  default     = "local"
}

variable "vm_name" {
  description = "Nom de base des VMs"
  type        = string
  default     = "node"
}

variable "vm_count" {
  description = "Nombre de VMs à créer"
  type        = number
  default     = 1
}
variable "bdd_vm_name" {
  description = "Nom de base des VMs"
  type        = string
  default     = "node"
}

variable "bdd_vm_count" {
  description = "Nombre de VMs à créer"
  type        = number
  default     = 1
}

variable "vm_cores" {
  description = "Nombre de cœurs CPU"
  type        = number
  default     = 2
}

variable "vm_memory" {
  description = "RAM en Mo"
  type        = number
  default     = 2048
}

variable "vm_disk_size" {
  description = "Taille du disque"
  type        = string
  default     = "32G"
}

variable "vm_ip_base" {
  description = "Base de l'adresse IP (ex: 192.168.1)"
  type        = string
}

variable "vm_gateway" {
  description = "Passerelle réseau"
  type        = string
}

variable "ssh_keys" {
  description = "Clés SSH publiques"
  type        = string
}

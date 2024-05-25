terraform {
  cloud {
    organization = "jaybeeTraining"

    workspaces {
      name = "development"
    }
  }
}

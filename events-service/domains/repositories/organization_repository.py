from sqlalchemy.orm import Session
from domains.models.organizations import Organizations
from domains.repositories.repo_exceptions import *
from domains.repositories.utils import *


class OrganizationRepository:
    session: Session

    def __init__(self, db_session: Session):
        self.session = db_session

    """
    Adds new Organization object to be persisted using Organization object

    :param new_organization: Organization object to be persisted
    :return: Organization of added organization
    """
    def _add_organization(self, new_organization: Organizations):
        self.session.add(new_organization)
        self.session.commit()
        return new_organization

    """
    Adds new Organization object to be persisted using organization_id

    :param organization_id: organization_id of new organization
    :return: Organization of added organization
    """
    @check_id_not_exists(Organizations, ["organization_id"])
    def add_organization(self, organization_id=None):
        new_organization = Organizations(organization_id=organization_id)
        return self._add_organization(new_organization)

    @check_id_exists(Organizations, ["organization_id"])
    def delete_organization(self, organization_id=None):
        organization = self.session.get(Organizations, organization_id)
        self.session.delete(organization)
        self.session.commit()
        return organization

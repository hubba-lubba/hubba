from sqlalchemy.orm import Session
from domains.models.events import Events
from domains.models.user import User
from domains.models.organizations import Organizations
from domains.repositories.repo_exceptions import *
from domains.repositories.utils import * 
from uuid import UUID
from sqlalchemy.sql import func
from events.publisher_factory import PublisherFactory

class OrganizationsRepository:
    session: Session

    def __init__(self, db_session: Session):
        self.session = db_session
        publisher_factory = PublisherFactory()
        self.publisher = publisher_factory.get_publisher()

    """
    Adds new Organizations object to be persisted using Organizations object

    :param new_organization: Organizations representing organization to be added
    :return: Organizations of added organization
    """
    def _add_organization(self, 
                          new_organization: Organizations):
        self.session.add(new_organization)
        self.session.commit()
        self.publisher.publish(action=True, 
                               uuid=str(new_organization.organization_id))
        return new_organization

    """
    Adds new Organizations object to be persisted using organization parameters

    :param name: str of name of organization
    :param image: str of image url of organization
    :param description: str of description of organization
    :param owner: uuid of owner of organization
    :return: Organizations of added organization
    """
    @check_id_exists(User, ["owner"])
    def add_organization(self, 
                         name=None,
                         image=None,
                         description=None, 
                         owner=None):
        owner = self.session.get(User, owner)

        new_organization = Organizations(name=name, 
                                         image=image,
                                         description=description, 
                                         owner=owner,
                                         moderators=[owner],
                                         users=[owner],
                                         events=[])


        return self._add_organization(new_organization)

    """
    Get Organizations object

    :param organization_id: uuid of organization_uuid
    :return: Organizations of organization
    """
    @check_id_exists(Organizations, ["organization_id"])
    def get_organization(self, organization_id):
        organizations = self.session.get(Organizations, organization_id)
        return organizations

    """
    Delete organization object
    :param organization_id: uuid of organization_id
    :return: uuid of deleted organization
    """
    @check_id_exists(Organizations, ["organization_id"])
    def delete_organization(self, organization_id):
        organization = self.get_organization(organization_id)
        self.session.delete(organization)
        self.session.commit()
        self.publisher.publish(action=False,
                               uuid=str(organization.uuid))
        return organization_id

    """
    Updates organization object to be persisted using organization object

    :param organization: Organization object to be updated
    :return: Organizations of updated organization
    """
    def _update_organization(self, organization):
        self.session.patch(organization)
        self.session.commit()
        return organization

    """
    Updates Organizations object to be persisted using organization parameters

    :param organization_id: uuid of organization_id
    :return: Organizations of updated organization
    """
    @check_id_exists(Organizations, ["organization_id"])
    def patch_organization(self,
                         organization_id, 
                         name=None,
                         image=None,
                         description=None):
        organization = self.get_organization(organization_id)

        organization.name = name if name else organization.name
        organization.image = image if image else organization.image
        organization.description = description if description else organization.description

        return self._update_organization(organization)

    @check_id_exists(Organizations, ["organization_id"])
    @check_id_exists(User, ["user_id"])
    def add_user(self, organization_id=None, user_id=None):
        organization = self.get_organization(organization_id)
        user = self.session.get(User, user_id)
        if not organization: return

        organization.users = list(set(organization.users + [user]))
        return self._update_organization(organization)

    @check_id_exists(Organizations, ["organization_id"])
    @check_id_exists(User, ["user_id"])
    def delete_user(self, organization_id=None, user_id=None):
        organization = self.get_organization(organization_id=organization_id)
        user = self.session.get(User, user_id)
        if not organization: return

        organization.users = list(set(organization.users) - set([user]))
        return self._update_organization(organization)

    def get_random_organizations(self):
        return self.session.query(Organizations).order_by(func.random()).limit(5).all()

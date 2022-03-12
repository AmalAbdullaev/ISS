import './header.scss';

import React from 'react';
import { Translate, Storage } from 'react-jhipster';
// import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup, Collapse } from '@themesberg/react-bootstrap';
import LoadingBar from 'react-redux-loading-bar';
import { Home } from './header-components';
import { AccountMenu } from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

export interface IHeaderState {
  menuOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    this.props.onLocaleChange(langKey);
  };

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { currentLocale, isAuthenticated, isAdmin, isSwaggerEnabled, isInProduction } = this.props;

    /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

    return (
      <div className="custom_header pb-4" id="app-header">
        <LoadingBar className="loading-bar" />
        <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
          <Nav id="header-tabs" className="ml-auto" navbar>
            <Home />
          </Nav>
          <Container fluid className="px-0">
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex align-items-center">
                <Form className="navbar-search">
                  <Form.Group id="topbarSearch">
                    <InputGroup className="input-group-merge search-bar">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                      </InputGroup.Text>
                      <Form.Control type="text" placeholder="Поиск" />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </div>
              <Nav className="align-items-center">
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle as={Nav.Link} className="text-dark icon-notifications me-lg-3">
                    <span className="icon icon-sm">
                      <FontAwesomeIcon icon={faBell} className="bell-shake" />
                      <span className="icon-badge rounded-circle unread-notifications" />
                    </span>
                  </Dropdown.Toggle>
                </Dropdown>
                <AccountMenu isAuthenticated={isAuthenticated} />
              </Nav>
            </div>
          </Container>
        </Navbar>
        {/* <Navbar dark expand='sm' fixed='top' className='bg-dark'>
          <NavbarToggler aria-label='Menu' onClick={this.toggleMenu} />
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav id='header-tabs' className='ml-auto' navbar>
              <Home />
              {isAuthenticated && <EntitiesMenu />}
              {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} />}
              <LocaleMenu currentLocale={currentLocale} onClick={this.handleLocaleChange} />
              <AccountMenu isAuthenticated={isAuthenticated} />
            </Nav>
          </Collapse>
        </Navbar> */}
      </div>
    );
  }
}

import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

// Components
import Icon from './icon.jsx'

const headerHeight = $('.navigation').outerHeight();

class Icons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  componentDidMount() {
    var {components} = this.props;
    var {links} = this.state;
    
    $(components).find('.component').each((index, component) => {
      var link = this.getLinkObject(component, index);

      links.push(link);
      $(component).prop('id', link.id).find('.component-type').each((subIndex, component) => {
        var subLink = this.getLinkObject(component, index + "-" + subIndex);
        $(component).prop('id', subLink.id);
        link.links.push(subLink);
      });
    });

    this.setState(this.state);
  }

  getLinkObject(component, index) {
    var title = $(component).find('> h1').text();
    var id = index + '-' + title.replace(/\ /gi, '-');
    var obj = {
      id,
      title,
      links: []
    }

    return obj;
  }

  scrollToLink(id, e) {
    var elem = document.getElementById(id);

    $(window).scrollTop($(elem).position().top - headerHeight);

    e.preventDefault();
  }

  generateLinks(links) {
    return (
      <ul>
        {
          _.map(links, (elem) => {
            return (
              <li key={elem.id}>
                <a href={'#' + elem.id} onClick={(e) => this.scrollToLink(elem.id, e)}>{elem.title}</a>
                {elem.links.length?
                  this.generateLinks(elem.links)
                  :null
                }
              </li>
            )
          })
        }
      </ul>
    ) 
  }

  getLinks() {
    var {links} = this.state;

    return this.generateLinks(links); 
  }

  render() {
    var {links, name} = this.state;

    return (
      <div className="style-guide-sidebar">
        {this.getLinks()}
        <a className="style-guide-sidebar-top button-circle" onClick={() => $(window).scrollTop(0)}>
          <Icon name="icon-top"/>
        </a>
      </div>
    );
  }
}

export default Icons;

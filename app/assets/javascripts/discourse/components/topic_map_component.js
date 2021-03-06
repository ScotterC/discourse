/**
  The topic map underneath the first post of a topic.

  @class DiscourseTopicMapComponent
  @extends Ember.Component
  @namespace Discourse
  @module Discourse
**/

var LINKS_SHOWN = 5;

Discourse.DiscourseTopicMapComponent = Ember.Component.extend({
  mapCollapsed: true,
  templateName: 'components/discourse-topic-map',
  details: Em.computed.alias('topic.details'),
  allLinksShown: false,

  init: function() {
    this._super();

    // If the topic has a summary, expand the map by default
    this.set('mapCollapsed', !this.get('topic.has_summary'));
  },

  toggleMapClass: function() {
    return this.get('mapCollapsed') ? 'icon-chevron-down' : 'icon-chevron-up';
  }.property('mapCollapsed'),

  showAllLinksControls: function() {
    if (this.get('allLinksShown')) return false;
    if ((this.get('details.links.length') || 0) <= LINKS_SHOWN) return false;
    return true;
  }.property('allLinksShown', 'topic.details.links'),

  infoLinks: function() {
    if (Em.isNone('details.links')) return [];

    var allLinks = this.get('details.links');
    if (this.get('allLinksShown')) return allLinks;
    return allLinks.slice(0, LINKS_SHOWN);
  }.property('details.links', 'allLinksShown'),

  actions: {
    toggleMap: function() {
      this.toggleProperty('mapCollapsed');
    },

    showAllLinks: function() {
      this.set('allLinksShown', true);
    }
  }
});
